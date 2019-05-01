import React from 'react';
import PropTypes from 'prop-types';

import { NewsListItem, Timestamp } from './styledComponents';

function News({ date, children }) {
  return (
    <NewsListItem>
      <Timestamp>{date} - </Timestamp>
      {children}
    </NewsListItem>
  );
}

News.propTypes = {
  date: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default News;
