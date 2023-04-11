import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the component when isOpen is true', () => {
    const { getByTestId } = render(<Modal isOpen onClose={() => {}} id="1" />);
    const modalOverlay = getByTestId('modal-overlay');
    expect(modalOverlay).toBeInTheDocument();
  });

  it('should not render the component when isOpen is false', () => {
    const { queryByTestId } = render(<Modal isOpen={false} onClose={() => {}} id="1" />);
    const modalOverlay = queryByTestId('modal-overlay');
    expect(modalOverlay).not.toBeInTheDocument();
  });

  it('should call onClose function when clicking outside the modal', () => {
    const onCloseMock = vi.fn();
    const { getByTestId } = render(<Modal isOpen onClose={onCloseMock} id="1" />);
    const modalOverlay = getByTestId('modal-overlay');
    fireEvent.mouseDown(modalOverlay);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose function when clicking on the close button', () => {
    const onCloseMock = vi.fn();
    const { getByLabelText } = render(<Modal isOpen onClose={onCloseMock} id="1" />);
    const closeButton = getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
