import React from 'react';

export default function PageWrapper({ children }) {
  return (
    <div className="purple-page-main__dashboard purple-page-main__dashboard_role_primary">
      <div className="purple-page-main__inner">{children}</div>
    </div>
  );
}
