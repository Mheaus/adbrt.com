import * as React from 'react';
import Link from 'next/link';

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { siteTitle = `` } = props;

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            href="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
