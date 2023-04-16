import React from 'react';

interface ProgressIndicatorProps {
  isLoading: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = (props) => {
  const { isLoading } = props;

  return isLoading ? (
    <div className="progress-indicator" data-testid="progress-indicator">
      <div className="progress-indicator__animation" />
    </div>
  ) : null;
};

export default ProgressIndicator;
