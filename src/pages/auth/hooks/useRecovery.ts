import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const cedulaSchema = z.object({
  cedula: z.string().min(6, 'Ingresa una cédula válida'),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type CedulaForm = z.infer<typeof cedulaSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;

interface UserData {
  nombre: string;
  cedula: string;
}

const useRecovery = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const cedulaForm = useForm<CedulaForm>({ resolver: zodResolver(cedulaSchema) });
  const passwordForm = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) });

  const handleSearchCedula = cedulaForm.handleSubmit(({ cedula }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (cedula === '87654321') {
        setUserData({ nombre: 'María García López', cedula });
        setActiveStep(1);
      } else {
        cedulaForm.setError('cedula', { message: 'Cédula no registrada en el sistema' });
      }
    }, 1500);
  });

  const handleCambiarContrasena = passwordForm.handleSubmit(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveStep(2);
    }, 1500);
  });

  return {
    activeStep,
    setActiveStep,
    userData,
    loading,
    showNewPassword,
    setShowNewPassword,
    cedulaForm,
    passwordForm,
    handleSearchCedula,
    handleCambiarContrasena,
  };
};

export default useRecovery;
