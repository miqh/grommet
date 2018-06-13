import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import Box from '../Box/Box';
import Text from '../Text/Text';

import { withFocus, withForwardRef, withTheme } from '../hocs';

import StyledButton from './StyledButton';
import doc from './doc';

const AnchorStyledButton = StyledButton.withComponent('a');

class Button extends Component {
  static defaultProps = {
    type: 'button',
    focusIndicator: true,
  };

  constructor(props) {
    super(props);

    const { children, icon, label } = props;
    if ((icon || label) && children) {
      console.warn('Button should not have children if icon or label is provided');
    }
  }

  render() {
    const {
      a11yTitle,
      forwardRef,
      children,
      icon,
      fill, // munged to avoid styled-components putting it in the DOM
      focus,
      href,
      label,
      onClick,
      plain,
      reverse,
      theme,
      type,
      ...rest
    } = this.props;

    const Tag = href ? AnchorStyledButton : StyledButton;

    const buttonLabel = typeof label === 'string' ? (
      <Text>
        <strong>{label}</strong>
      </Text>
    ) : label;

    const first = reverse ? buttonLabel : icon;
    const second = reverse ? icon : buttonLabel;

    const disabled = (
      !href &&
      !onClick &&
      ['reset', 'submit'].indexOf(type) === -1
    );

    return (
      <Tag
        {...rest}
        innerRef={forwardRef}
        aria-label={a11yTitle}
        disabled={disabled}
        icon={icon}
        fillContainer={fill}
        focus={focus}
        href={href}
        label={label}
        onClick={onClick}
        plain={typeof plain !== 'undefined' ? (
          plain
        ) : (
          (Children.count(children) > 0 || (icon && !label))
        )}
        theme={theme}
        type={!href ? type : undefined}
      >
        {(first || second) ? (
          <Box direction='row' align='center' gap='small'>
            {first}
            {second}
          </Box>
        ) : children}
      </Tag>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Button);
}

export default compose(
  withFocus,
  withTheme,
  withForwardRef,
)(Button);
