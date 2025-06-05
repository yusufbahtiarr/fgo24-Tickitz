import { toast } from "react-toastify";

/**
 *
 * @param {'success' | 'error' | 'info' | 'warn' } type - Jenis toast
 * @param {string} message - Pesan yang ingin ditampilkan
 * @param {object} [customOptions] - Opsi tambahan opsional
 *
 */

export const showNotif = (type, message, customOptions = {}) => {
  const defaultOption = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: false,
    theme: "light",
    ...customOptions,
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOption);
      break;
    case "error":
      toast.error(message, defaultOption);
      break;
    case "info":
      toast.info(message, defaultOption);
      break;
    case "warn":
      toast.warn(message, defaultOption);
      break;
    default:
      toast(message, defaultOption);
  }
};
