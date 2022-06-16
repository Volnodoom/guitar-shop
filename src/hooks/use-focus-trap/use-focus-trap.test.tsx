import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useRef} from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { useFocusTrap } from './use-focus-trap';
import { ModalStatus } from '../../const';

describe('Custom hook: use-focus-trap', () => {
  it('Pressing tab button focus element', async () => {
    const {result: resultRef} = renderHook(() => useRef<HTMLDivElement>(null));
    render(
      <div ref={resultRef.current}>
        <button>Button1</button>
        <input type="checkbox" />
        <button>Button2</button>
        <input type="text" />
      </div>
    );

    renderHook(() => useFocusTrap(resultRef.current, ModalStatus.OpenReview, true));

    userEvent.keyboard('{Tab}');
    await waitFor(() => expect(screen.getByRole('button', {name: /Button1/i})).toHaveFocus());
    userEvent.keyboard('{Tab}');
    await waitFor(() => expect(screen.getByRole('checkbox')).toHaveFocus());
    userEvent.keyboard('{Tab}');
    await waitFor(() => expect(screen.getByRole('button', {name: /Button2/i})).toHaveFocus());
    userEvent.keyboard('{Tab}');
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus());
  });
});
