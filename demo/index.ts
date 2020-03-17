import Toastr from '../src/Toastr';

const toastr = new Toastr();

let i = -1;
let toastIndex = 0;
let lastToast;

const getMessage = (): string => {
  const msgs = [
    'My name is Inigo Montoya. You killed my father. Prepare to die!',
    '<div><input class="input-small" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>',
    'Are you the six fingered man?',
    'Inconceivable!',
    'I do not think that means what you think it means.',
    'Have fun storming the castle!',
  ];

  i += 1;

  if (i === msgs.length) {
    i = 0;
  }

  return msgs[i];
};

const getMessageWithClearButton = (msg = 'Clear itself?'): string => (
  `${msg}<br /><br /><button type="button" class="btn clear">Yes</button>`
);

const form = (): void => {
  const showToastForm = document.getElementById('toastForm');

  if (!showToastForm) {
    return;
  }

  showToastForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(showToastForm as HTMLFormElement);

    let message = formData.get('message') as string;

    const shortCutFunction = formData.get('toastTypeGroup') as string;
    const title = formData.get('title');
    const showDuration = formData.get('showDuration');
    const hideDuration = formData.get('hideDuration');
    const timeOut = formData.get('timeOut');
    const extendedTimeOut = formData.get('extendedTimeOut');
    const showEasing = formData.get('showEasing');
    const hideEasing = formData.get('hideEasing');
    const showMethod = formData.get('showMethod');
    const hideMethod = formData.get('hideMethod');
    const addClear = formData.get('addClear');

    toastIndex += 1;

    toastr.options.closeButton = !!formData.get('closeButton');
    toastr.options.debug = !!formData.get('debugInfo');
    toastr.options.newestOnTop = !!formData.get('newestOnTop');
    toastr.options.progressBar = !!formData.get('progressBar');
    toastr.options.rtl = !!formData.get('rtl');
    toastr.options.positionClass = formData.get('positionGroup') as string || 'toast-top-right';
    toastr.options.preventDuplicates = !!formData.get('preventDuplicates');
    toastr.options.onclick = null;

    if (formData.get('addBehaviorOnToastClick')) {
      toastr.options.onclick = () => (
        // eslint-disable-next-line no-alert
        alert('You can perform some custom action after a toast goes away')
      );
    }

    if (formData.get('addBehaviorOnToastCloseClick')) {
      toastr.options.onCloseClick = () => (
        // eslint-disable-next-line no-alert
        alert('You can perform some custom action when the close button is clicked')
      );
    }

    if (showDuration) {
      toastr.options.showDuration = Number(showDuration);
    }

    if (hideDuration) {
      toastr.options.hideDuration = Number(hideDuration);
    }

    if (timeOut) {
      toastr.options.timeOut = addClear ? 0 : Number(timeOut);
    }

    if (extendedTimeOut) {
      toastr.options.extendedTimeOut = addClear ? 0 : Number(extendedTimeOut);
    }

    if (showEasing) {
      toastr.options.showEasing = showEasing as any;
    }

    if (hideEasing) {
      toastr.options.hideEasing = hideEasing as any;
    }

    if (showMethod) {
      toastr.options.showMethod = showMethod as any;
    }

    if (hideMethod) {
      toastr.options.hideMethod = hideMethod as any;
    }

    if (addClear) {
      message = getMessageWithClearButton(message);
      toastr.options.tapToDismiss = false;
    }

    if (!message) {
      message = getMessage();
    }

    const toastrOptionsEl = document.getElementById('toastrOptions');

    if (toastrOptionsEl) {
      toastrOptionsEl.innerHTML = `Command: toastr.${shortCutFunction}("${message}${title ? `, ${title}` : ''}")

toastr.options = ${JSON.stringify(toastr.options, null, 2)}
        `;
    }


    // Wire up an event handler to a button in the toast, if it exists
    lastToast = toastr[shortCutFunction](message, title) as HTMLElement;

    if (!lastToast) {
      return;
    }

    const lastOkBtn = lastToast.querySelector('#okBtn');
    const lastSurpriseBtn = lastToast.querySelector('#surpriseBtn');
    const lastClear = lastToast.querySelector('.clear');

    if (lastOkBtn) {
      lastOkBtn.addEventListener('click', () => {
        // eslint-disable-next-line no-alert
        alert(`you clicked me. i was toast #${toastIndex}. goodbye!`);

        lastToast.remove();
      });
    }

    if (lastSurpriseBtn) {
      lastSurpriseBtn.addEventListener('click', () => (
        // eslint-disable-next-line no-alert
        alert(`Surprise! you clicked me. i was toast #${toastIndex}. You could perform an action here.`)
      ));
    }

    if (lastClear) {
      lastClear.addEventListener('click', () => {
        toastr.clear(lastToast, { force: true });
      });
    }
  });
};

form();

const closeButtonEl = document.getElementById('closeButton') as HTMLInputElement;
const addBehaviorOnToastCloseClickEl = document.getElementById('addBehaviorOnToastCloseClick') as HTMLInputElement;
const clearLastToastEl = document.getElementById('clearlasttoast');
const clearAllToastsEl = document.getElementById('cleartoasts');

if (closeButtonEl && addBehaviorOnToastCloseClickEl) {
  closeButtonEl.addEventListener('click', () => {
    if (closeButtonEl.checked) {
      addBehaviorOnToastCloseClickEl.removeAttribute('disabled');
    } else {
      addBehaviorOnToastCloseClickEl.setAttribute('disabled', '');
      addBehaviorOnToastCloseClickEl.checked = false;
    }
  });
}

if (clearLastToastEl) {
  clearLastToastEl.addEventListener('click', () => {
    toastr.clear(lastToast);
  });
}

if (clearAllToastsEl) {
  clearAllToastsEl.addEventListener('click', () => {
    toastr.clear();
  });
}
