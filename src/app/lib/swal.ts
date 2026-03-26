import Swal from 'sweetalert2';

/**
 * Instância global do SweetAlert2 com design padronizado para a TS PNEUS.
 * Fundo escuro (#0d0f14), bordas azuis (#2563eb), e fontes estilizadas em itálico.
 */
export const customSwal = Swal.mixin({
  background: "#0d0f14",
  color: "#f8fafc",
  customClass: {
    popup: 'border border-blue-600/50 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.15)]',
    title: 'text-xl font-black italic uppercase text-white tracking-tighter',
    htmlContainer: 'text-sm text-slate-300',
    confirmButton: 'bg-blue-600 text-white rounded-lg text-xs font-black italic uppercase hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all w-full py-3 mt-4 flex items-center justify-center gap-2',
    cancelButton: 'bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-lg text-xs font-bold uppercase transition-all w-full py-3 mt-2',
  },
  buttonsStyling: false,
});

/**
 * Utilitário de Toasts rápidos no canto superior direito
 */
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "#0d0f14",
  color: "#fff",
  customClass: {
    popup: 'border border-blue-600/30'
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export default customSwal;
