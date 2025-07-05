import { Input } from './ui/input';

export type MotorSetupProps = {
  OBtoIB?: string,
  IBtoF?: string,
  Fdia?: string,
}

export default function MotorSetup({ onChange, state }: {
  onChange: (name: keyof MotorSetupProps, value: string) => void;
  state: MotorSetupProps;
}) {
  return (
    <div className="flex">
      <div className="relative w-full max-w-sm pr-8">
        <div className="relative w-full max-w-sm flex h-32 items-center">
          <div className="h-full w-7/10 border-1 border-foreground"></div>
          <div className="border-y-1 border-foreground h-8 w-2/10"></div>
          <div className="border-1 border-foreground h-full w-1/10"></div>
          <div className="absolute -right-8 h-full flex">
            <div className="w-1 border-y-1 border-foreground h-full"></div>
            <div className="w-1 border-y-1 border-l-1 border-foreground h-full"></div>
          </div>
          <div className="absolute top-0 -translate-y-full [clip-path:polygon(100%_0,0_0,50%_100%)] right-0 h-4 w-2 bg-red-500"></div>
          <div className="absolute top-2 -translate-y-full [clip-path:polygon(100%_100%,100%_0,0_50%)] translate-x-full right-0 h-2 w-4 bg-red-500"></div>
        </div>
        <div className="relative flex w-full">
          <div className="[clip-path:polygon(50%_0%,0%_100%,100%_100%)] -translate-x-4 h-8 w-8 bg-foreground"></div>
          <div className="[clip-path:polygon(50%_0%,0%_100%,100%_100%)] absolute left-7/10 -translate-x-4 h-8 w-8 bg-foreground"></div>
        </div>
        <div className="flex h-2 border-b-1 border-foreground w-full mt-4">
          <div className="w-7/10 border-x-1 border-foreground"></div>
          <div className="w-3/10 border-r-1 border-foreground"></div>
        </div>
        <div className="flex h-2 w-full">
          <div className="w-7/10 border-x-1 border-foreground"></div>
          <div className="w-3/10 border-r-1 border-foreground"></div>
        </div>
        <div className="mt-4 w-full flex">
          <div className="w-7/10">
            <Input
              type="number"
              placeholder="cm"
              value={state.OBtoIB}
              className="w-full"
              onChange={(e) => onChange('OBtoIB', e.target.value)}
            />
          </div>
          <div className="w-3/10">
            <Input
              type="number"
              placeholder="cm"
              value={state.IBtoF}
              className="w-full"
              onChange={(e) => onChange('IBtoF', e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="pl-2 flex items-center h-32">
        <div className="w-16 h-min text-sm">
          <Input
            type="number"
            placeholder="cm"
            value={state.Fdia}
            className="h-min w-full"
            onChange={(e) => onChange('Fdia', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}