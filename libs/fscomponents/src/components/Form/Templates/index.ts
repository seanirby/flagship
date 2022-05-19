import {
  labelAboveTextbox,
  labelFloatingTextbox,
  labelHiddenTextbox,
  labelInlineTextbox,
} from './textboxTemplates';

export const inlineLabels = {
  textbox: labelInlineTextbox,
};

export const hiddenLabels = {
  textbox: labelHiddenTextbox,
};

export const floatingLabels = {
  textbox: labelFloatingTextbox,
};

export const aboveLabels = {
  textbox: labelAboveTextbox,
};

export * from './StatefulTextbox';
export * from './fieldTemplates';
export * from './stylesheet';
