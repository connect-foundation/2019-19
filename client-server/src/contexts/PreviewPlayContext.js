import React, { createContext, useState } from 'react';

const PreviewPlayContext = createContext();

const PreviewPlayProvider = props => {
  const [detailPreviewPlaying, setDetailPreviewPlaying] = useState(false);

  const value = {
    detailPreviewPlaying,
    setDetailPreviewPlaying,
  };
  const { children } = props;
  return (
    <PreviewPlayContext.Provider value={value}>
      {children}
    </PreviewPlayContext.Provider>
  );
};

export { PreviewPlayContext, PreviewPlayProvider };
