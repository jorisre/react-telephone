import { Phone } from 'react-telephone';
import { useForm } from 'react-hook-form';

export function ReactHookFormSample() {
  const { register, watch } = useForm<{ phoneNumber: string }>();

  return (
    <div>
      <Phone {...register('phoneNumber')}>
        <Phone.Country />
        <Phone.Number placeholder="6 12 34 56 78" />
      </Phone>

      <span className="block text-white text-center font-bold text-lg mt-4">
        {watch('phoneNumber')}
      </span>
    </div>
  );
}
