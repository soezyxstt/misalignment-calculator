import { Input } from './ui/input';

export type CircleSetupProps = {
  Ftop?: string,
  Fbottom?: string,
  Fleft?: string,
  Fright?: string,
  Rtop?: string,
  Rbottom?: string,
  Rleft?: string,
  Rright?: string,
}

export default function CircleSetup({ state, onChange }: {
  onChange: (name: keyof CircleSetupProps, value: string) => void;
  state: CircleSetupProps;
}) {

  return (
    <div className="w-full max-w-104 grid place-items-center">
      <div className="w-full aspect-square max-w-64 rounded-full border-1 border-foreground relative">
        {/* top */}
        <div className='absolute top-4 w-16 left-1/2 -translate-x-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Ftop} onChange={(e) => onChange('Ftop', e.target.value)} className='h-min' />
        </div>
        <div className='absolute -top-2 w-16 -translate-y-full left-1/2 -translate-x-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Rtop} onChange={(e) => onChange('Rtop', e.target.value)} className='h-min' />
        </div>
        {/* bottom */}
        <div className='absolute bottom-4 w-16 left-1/2 -translate-x-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Fbottom} onChange={(e) => onChange('Fbottom', e.target.value)} className='h-min' />
        </div>
        <div className='absolute -bottom-2 w-16 translate-y-full left-1/2 -translate-x-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Rbottom} onChange={(e) => onChange('Rbottom', e.target.value)} className='h-min' />
        </div>
        {/* left */}
        <div className='absolute left-4 w-16 top-1/2 -translate-y-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Fleft} onChange={(e) => onChange('Fleft', e.target.value)} className='h-min' />
        </div>
        <div className='absolute -left-2 w-16 -translate-x-full top-1/2 -translate-y-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Rleft} onChange={(e) => onChange('Rleft', e.target.value)} className='h-min' />
        </div>
        {/* right */}
        <div className='absolute right-4 w-16 top-1/2 -translate-y-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Fright} onChange={(e) => onChange('Fright', e.target.value)} className='h-min' />
        </div>
        <div className='absolute -right-2 w-16 translate-x-full top-1/2 -translate-y-1/2 text-sm'>
          <Input type='number' placeholder='µm' value={state.Rright} onChange={(e) => onChange('Rright', e.target.value)} className='h-min' />
        </div>
      </div>
    </div>
  )
}