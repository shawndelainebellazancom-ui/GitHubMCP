using System;

namespace ChopChop.Services
{
    public class UIService
    {
        public event Action<string>? ToastRequested;
    public event Action<string>? ErrorRequested;
        public event Action<bool>? BusyChanged;

        public void ShowToast(string text) => ToastRequested?.Invoke(text);
    public void ShowError(string text) => ErrorRequested?.Invoke(text);
        public void SetBusy(bool busy) => BusyChanged?.Invoke(busy);
    }
}
