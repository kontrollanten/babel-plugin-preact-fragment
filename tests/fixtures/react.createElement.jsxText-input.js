

import React, { Fragment } from 'react';
import classNames from 'classnames';
import IconSvg from '../../UI/Icon/IconSvg';

const SectionBreadcrumb = ({
  code,
  description,
  links,
  previous,
  titleLevel
}) => {
  const textColorClass = code ? `test-color--${code}` : 'test-color--isWhite';
  const iconColorClass = code ? `icon-color--${code}` : 'icon-color--isWhite';

  const NextIcon = <div className={classNames('breadcrumb__icon', iconColorClass)}>
            <IconSvg name="icon--home" size="xsmall" />
        </div>;

  const AllLinks = links.map(({
    logo,
    title,
    url
  }, index) => {
    const logoAttributes = {};
    if (title !== '') {
      logoAttributes.title = title;
    }

    const isHighlighted = index === links.length - 1;
      return (
          <Fragment key={`${title}-${index}`}>
              {url ?
                  <a
                      className={classNames('breadcrumb__category', textColorClass, { 'is-highlighted': isHighlighted })}
                      href={url}
                  >
                      {title}
                  </a> :
                  <div className={classNames('breadcrumb__category', textColorClass, { 'is-highlighted': isHighlighted })}>
                      {title}
                  </div>
              }
              {url && NextIcon}
          </Fragment>
      );
  });

  return <div className={classNames('breadcrumb')}>
            {React.createElement(titleLevel ? `h${titleLevel}` : 'div', {
      className: 'breadcrumb__main'
    }, AllLinks)}
            {description && <div className="breadcrumb__description" title={description}>
                    {description}
                </div>}
        </div>;
};

export default SectionBreadcrumb;

