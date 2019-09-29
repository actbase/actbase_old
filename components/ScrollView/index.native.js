import React from 'react';

import { Animated, Dimensions, findNodeHandle, Keyboard, UIManager } from 'react-native';

const { height } = Dimensions.get('screen');

export default class ScrollView extends React.PureComponent {

  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    this.scrollRef = React.createRef();
    this._offsetY = 0;
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  async onLayout() {
    if (!this.scrollRef.current) {
      return;
    }
    const _p = await this.measure(findNodeHandle(this.scrollRef.current));
    this._gap = height - (_p.height + _p.pageY);
    this._spo = _p.pageY;
    this._sph = _p.height;
  }

  el() {
    const el = this.scrollRef.current;
    return (el.getNode) ? el.getNode() : el;
  }

  keyboardWillShow = (event) => {

    if (!this._focus) {
      this._spg = this._sph - (event.endCoordinates.height - (this._gap || 0));
      this.moveTo();
    }

    this._focus = true;
    this.props.onKeyboardShow && this.props.onKeyboardShow(false);

    this.setState({ show: true });

    if (this.animated) {
      this.animated.stop();
      this.animated = null;
    }
    this.animated = Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height - (this._gap || 0),
      }),
    ]);
    this.animated.start();
  };

  keyboardWillHide = (event) => {
    this._focus = false;
    this.props.onKeyboardHide && this.props.onKeyboardHide(false);

    if (this.animated) {
      this.animated.stop();
      this.animated = null;
    }

    this.animated = Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: this.props.paddingBottom ? this.props.paddingBottom : 0,
      }),
    ]);
    this.animated.start();
  };

  keyboardDidShow = (event) => {
    this._focus = true;
    this.props.onKeyboardShow && this.props.onKeyboardShow(true);
    this.setState({ show: true });
    this.moveTo(false);
  };

  keyboardDidHide = (event) => {
    this._focus = false;
    this.props.onKeyboardHide && this.props.onKeyboardHide(true);
    this.setState({ show: false });
  };


  onFocus(e) {
    this._lt = e.target || e.currentTarget;
    if (this._focus) {
      this.moveTo();
    }
  }

  async moveTo(animated = true) {
    if (!this._lt) {
      return;
    }
    const { pageY, height } = await this.measure(this._lt);
    const _y = pageY - this._spo + this._offsetY;

    if (pageY < 10) {
      this.el()?.scrollTo({ y: _y, animated });
    }
    else if (_y + height > this._spg + this._offsetY) {
      this.el()?.scrollTo({ y: _y - this._spg + height, animated });
    }
  }

  measure(target) {
    return new Promise((resolve, reject) => {
      try {
        UIManager.measure(target, (originX, originY, width, height, pageX, pageY) => resolve({
          originX,
          originY,
          width,
          height,
          pageX,
          pageY,
        }));
      }
      catch (e) {
        reject(e);
      }
    });
  }

  render() {
    const { children, onFocus, onLayout, onMomentumScrollEnd, ...props } = this.props;

    const Element = this.props.onScroll ? Animated.ScrollView : ScrollView;

    return (
      <Element
        ref={this.scrollRef}
        keyboardShouldPersistTaps={'handled'}
        onMomentumScrollEnd={(e) => {
          this._offsetY = e.nativeEvent.contentOffset.y;
          onMomentumScrollEnd && onMomentumScrollEnd(e);
        }}
        onLayout={(e) => {
          this.onLayout();
          onLayout && onLayout(e);
        }}
        onFocus={(e) => {
          this.onFocus(e);
          onFocus && onFocus(e);
        }}
        {...props}>
        {children}
        <Animated.View style={{ height: this.keyboardHeight }} />
      </Element>
    );
  }

}



