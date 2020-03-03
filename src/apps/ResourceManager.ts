import { forIn } from 'lodash';

import * as R_LAYOUT_DATA from '../layouts/res/styles';
import * as R_BUTTON_DATA from '../buttons/res/styles';
import * as R_TEXT_INPUT_DATA from '../textinput/res/styles';
import * as R_SELECT_DATA from '../select/res/styles';

export interface AnyObject {
  [key: string]: any;
}

export const R_LAYOUT_NAME: string = 'ab-layout';
export const R_BUTTON_NAME: string = 'ab-button';
export const R_TEXT_INPUT_NAME: string = 'ab-input-text';
export const R_SELECT_NAME: string = 'ab-select';

export const RES_NAMES: string[] = [R_LAYOUT_NAME, R_BUTTON_NAME, R_TEXT_INPUT_NAME, R_SELECT_NAME];

export const datas = {
  [R_LAYOUT_NAME]: { ...R_LAYOUT_DATA },
  [R_BUTTON_NAME]: { ...R_BUTTON_DATA },
  [R_TEXT_INPUT_NAME]: { ...R_TEXT_INPUT_DATA },
  [R_SELECT_NAME]: { ...R_SELECT_DATA },
};

export const enableStyles: string[] = [];

export const setOverride = (type: 'styles' | 'assets', arg: { [key: string]: { styles?: any; assets?: any } }) => {
  forIn(arg, (value, key: string) => {
    const name = RES_NAMES.find(v => key.startsWith(v));
    if (name && datas[name][type]) {
      datas[name][type][key] = { ...(datas[name][type][key] || {}), ...value };
    }
  });
};
