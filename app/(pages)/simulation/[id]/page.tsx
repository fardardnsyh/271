'use client';

import { Button, Spinner } from '@nextui-org/react';
import React, {
  useEffect, useMemo, useReducer, useState,
} from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';

// Components
import DetailsMain from '@/_private/components/details/detailsMain/DetailsMain';
import DeleteButton from '@/_private/components/details/detailsFooter/DeleteButton';
import RecreateButton from '@/_private/components/details/detailsFooter/RecreateButton';
import CopyButton from '@/_private/components/details/detailsFooter/CopyButton';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

// Actions
import simulationActionCreators from '@/_private/lib/actions/simulationActions';

// Reducers
import simulationReducer from '@/_private/lib/reducers/simulationReducer';

export default function DetailsPage(
  { params: { id } }:
  { params: { id: string } },
) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [simulations, dispatchSimulation] = useReducer(simulationReducer, []);

  // First, gets simulations
  useEffect(() => {
    simulationActionCreators.readAllSimulations(dispatchSimulation);
  }, []);

  // Then, finds simulation
  const selectedSimulation: Simulation | undefined = useMemo(() => simulations.find(
    (simulation: Simulation): boolean => simulation.id === id,
  ), [simulations, id]);

  useEffect(() => {
    if (!selectedSimulation && deleted) router.push('/');
    else if (loading) setLoading(false);
  }, [selectedSimulation, deleted]);

  if (deleted) return null;

  if (!loading && !selectedSimulation) return notFound();

  return (
    <>
      <header className="p-4 border-b border-b-neutral-800  flex justify-between">
        <Button
          href="/"
          variant="light"
          as={Link}
        >
          ←
        </Button>
        <div className="pt-2">Job details</div>
        <Button className="invisible" />
      </header>
      <main className="px-4 pt-2 mb-auto overflow-auto">
        {(loading)
          ? (<Spinner className="flex justify-center" />)
          : (
            <DetailsMain
              selectedSimulation={selectedSimulation as Simulation}
              dispatchSimulation={dispatchSimulation}
            />
          )}
      </main>
      <footer className="p-4 border-t border-t-neutral-800 ">
        {(loading)
          ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )
          : (
            <div className="flex justify-between">
              <DeleteButton
                selectedSimulation={selectedSimulation as Simulation}
                dispatchSimulation={dispatchSimulation}
                setDeleted={setDeleted}
              />
              <CopyButton />
              <RecreateButton
                selectedSimulation={selectedSimulation as Simulation}
                isOpen={false}
                onClose={() => {}}
              />
            </div>
          )}
      </footer>
    </>
  );
}
