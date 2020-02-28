import { AnyObject } from '../../apps/ResourceManager';

export const assets: AnyObject = {};

export const styles: AnyObject = {
  'ab-button': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'ab-button-hover': {},
  'ab-button-press': {},
  'ab-button-disabled': {},

  'ab-button-tpl-default': {
    borderRadius: 4,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    height: 38,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderStyle: 'solid',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  'ab-button-tpl-default-press': {
    borderWidth: 1,
    borderColor: '#007bff',
    borderStyle: 'solid',
    color: '#007bff',
  },
  'ab-button-tpl-default-disabled': {
    color: 'rgba(0, 0, 0, 0.25)',
    backgroundColor: '#f5f5f5',
    borderColor: '#d9d9d9',
  },

  'ab-button-tpl-link': {
    backgroundColor: 'transparent',
    color: '#007bff',
    borderWidth: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
  'ab-button-tpl-link-press': {
    color: '#f00',
  },
  'ab-button-tpl-link-disabled': {
    color: 'rgba(0, 0, 0, 0.25)',
  },
};

export default {
  assets,
  styles,
};
