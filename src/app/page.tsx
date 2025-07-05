"use client";

import CircleSetup, { type CircleSetupProps } from '@/components/circle-setup';
import MotorSetup, { type MotorSetupProps } from '@/components/motor-setup';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// Types for calculation results
type MisalignmentCorrections = {
  OB_vertical: number;    // How much OB needs to move up (+) or down (-)
  OB_horizontal: number;  // How much OB needs to move right (+) or left (-)
  IB_vertical: number;    // How much IB needs to move up (+) or down (-)
  IB_horizontal: number;  // How much IB needs to move right (+) or left (-)
};

// Function to calculate misalignment corrections
function calculateMisalignmentCorrections(
  motorData: MotorSetupProps,
  circleData: CircleSetupProps,
  bracketSag: string | number = "0"
): MisalignmentCorrections | null {
  // Check if required data is available
  if (!motorData.OBtoIB || !motorData.IBtoF || !motorData.Fdia) {
    return null;
  }

  // Convert all inputs to numbers
  const OBtoIB = Number(motorData.OBtoIB);
  const IBtoF = Number(motorData.IBtoF);
  const Fdia = Number(motorData.Fdia);
  
  const Ftop = Number(circleData.Ftop || 0);
  const Fbottom = Number(circleData.Fbottom || 0);
  const Fleft = Number(circleData.Fleft || 0);
  const Fright = Number(circleData.Fright || 0);
  const Rtop = Number(circleData.Rtop || 0);
  const Rbottom_ = Number(circleData.Rbottom || 0);
  const Rleft = Number(circleData.Rleft || 0);
  const Rright = Number(circleData.Rright || 0);
  
  const bracketSagNum = Number(bracketSag);
  const Rbottom = Rbottom_ + bracketSagNum;

  // Convert units: motor distances from cm to mm, face diameter from cm to mm
  const OBtoIB_mm = OBtoIB * 10;
  const IBtoF_mm = IBtoF * 10;
  const Fdia_mm = Fdia * 10;
  const totalDistance_mm = OBtoIB_mm + IBtoF_mm;

  // Calculate face misalignment (average of opposite readings)
  const faceVertical = -Ftop + Fbottom; // µm
  const faceHorizontal = -Fright + Fleft; // µm

  // Calculate rim misalignment (average of opposite readings)
  const rimVertical = (Rtop - Rbottom) / 2; // µm
  const rimHorizontal = (Rright - Rleft) / 2; // µm

  // Calculate angular misalignment (rim readings / face diameter)
  const angularVertical = faceVertical / Fdia_mm; // µm per mm
  const angularHorizontal = faceHorizontal / Fdia_mm; // µm per mm

  // Calculate corrections needed at each bearing position
  // Face misalignment correction is distributed proportionally
  // Angular misalignment creates additional offset based on distance

  // For IB (Inboard Bearing):
  const IB_vertical = angularVertical * IBtoF_mm + rimVertical;
  const IB_horizontal = angularHorizontal * IBtoF_mm + rimHorizontal;

  // For OB (Outboard Bearing):
  const OB_vertical = angularVertical * totalDistance_mm + rimVertical;
  const OB_horizontal = angularHorizontal * totalDistance_mm + rimHorizontal;

  return {
    OB_vertical: Math.round(OB_vertical * 1000) / 1000,
    OB_horizontal: Math.round(OB_horizontal * 1000) / 1000,
    IB_vertical: Math.round(IB_vertical * 1000) / 1000,
    IB_horizontal: Math.round(IB_horizontal * 1000) / 1000,
  };
}

export default function Home() {
  const [motorState, setMotorState] = useState<MotorSetupProps>({})

  const handleChangeMotor: (name: keyof MotorSetupProps, value: string) => void = (name, value) => {
    setMotorState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [circleState, setCircleState] = useState<CircleSetupProps>({});

  const handleChangeCircle: (name: keyof CircleSetupProps, value: string) => void = (name, value) => {
    setCircleState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [sag, setSag] = useState<string>();

  // Calculate misalignment corrections
  const corrections = calculateMisalignmentCorrections(motorState, circleState, sag || 0);

  return (
    <main className="min-h-screen">
      <section className='container mx-auto px-6 md:px-20 py-8 md:py-16 md:gap-20'>
        <div className="w-full md:flex md:items-center ">
          <MotorSetup state={motorState} onChange={handleChangeMotor} />
          <CircleSetup state={circleState} onChange={handleChangeCircle} />
        </div>
        <div className='flex items-center mb-8'>
          <p className="">Bracket Sag: </p>
          <Input type='text' inputMode='decimal' placeholder='mm' value={sag} onChange={(e) => setSag(e.target.value)} className='h-min w-24 ml-2' />
        </div>

        {/* Display calculation results */}
        {corrections && (
          <div className='p-6 rounded-lg'>
            <h2 className='text-xl font-bold mb-4'>Misalignment Corrections</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Outboard Bearing (OB)</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>Vertical movement:</span>
                    <span className={`font-mono ${corrections.OB_vertical > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {corrections.OB_vertical > 0 ? '+' : ''}{corrections.OB_vertical} µm
                      <span className='text-sm text-gray-500 ml-1'>
                        ({corrections.OB_vertical > 0 ? 'up' : 'down'})
                      </span>
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Horizontal movement:</span>
                    <span className={`font-mono ${corrections.OB_horizontal > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {corrections.OB_horizontal > 0 ? '+' : ''}{corrections.OB_horizontal} µm
                      <span className='text-sm text-gray-500 ml-1'>
                        ({corrections.OB_horizontal > 0 ? 'right' : 'left'})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Inboard Bearing (IB)</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>Vertical movement:</span>
                    <span className={`font-mono ${corrections.IB_vertical > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {corrections.IB_vertical > 0 ? '+' : ''}{corrections.IB_vertical} µm
                      <span className='text-sm text-gray-500 ml-1'>
                        ({corrections.IB_vertical > 0 ? 'up' : 'down'})
                      </span>
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Horizontal movement:</span>
                    <span className={`font-mono ${corrections.IB_horizontal > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {corrections.IB_horizontal > 0 ? '+' : ''}{corrections.IB_horizontal} µm
                      <span className='text-sm text-gray-500 ml-1'>
                        ({corrections.IB_horizontal > 0 ? 'right' : 'left'})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
