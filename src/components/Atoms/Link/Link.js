import React from 'react';
import PropTypes from 'prop-types'
import styles from './styles.sass';

const Link = ({
  href, children, ...rest
}) => (
  <a href={href} className={styles.default} {...rest}>
    {children}
  </a>
);

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Link;
