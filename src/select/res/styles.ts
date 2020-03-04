import arrowDown from './arrow_down.png';
import { AnyObject } from '../../apps/ResourceManager';

export const assets: AnyObject = {
  'ab-select-arrow-image': arrowDown,
};

export const styles: AnyObject = {
  'ab-select': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'ab-select-arrow': {
    width: 20,
    height: 20,
  },
  'ab-select-placeholder': {},
  'ab-select-tpl-default': {
    borderRadius: 4,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    height: 38,
    fontSize: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderStyle: 'solid',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  'ab-select-arrow-tpl-default': {},
};

export default {
  assets,
  styles,
};
