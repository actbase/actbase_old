import { AnyObject } from '../../apps/ResourceManager';

export const assets: AnyObject = {};

export const styles: AnyObject = {
  'ab-input-text': {
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
    flexDirection: 'row',
  },
  'ab-input-text-focused': {
    borderColor: '#333',
  },
  'ab-input-text-disabled': {
    backgroundColor: '#eee',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  'ab-input-text-hint': {
    color: '#333333',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
  },
  'ab-input-text-error': {
    borderColor: '#db2929',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  'ab-input-text-hint-error': {
    color: '#db2929',
  },
  'ab-input-text-clear': {
    backgroundColor: '#ccc',
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  'ab-input-text-clear-line': {
    position: 'absolute',
    width: 1.5,
    height: 8,
    backgroundColor: '#fff',
  },
};

export default {
  assets,
  styles,
};
