import { Simulation, SimulationAction } from '@/_private/types/lib/simulationTypes';

const simulationReducer = (
  currentState: Simulation[],
  action: SimulationAction,
): Simulation[] => {
  let nextState = null;

  switch (action.type) {
    case 'READ_ALL_SIMULATIONS': {
      nextState = [...action.simulations];
      break; }
    case 'CREATE_SIMULATION': {
      nextState = [action.simulation, ...currentState];
      break; }
    case 'DELETE_SIMULATION': {
      nextState = [...currentState.filter(({ id }: Simulation) => id !== action.id)];
      break; }
    case 'UPDATE_SIMULATION': {
      nextState = currentState.map((simulation: Simulation): Simulation => (
        (simulation.id === action.simulation.id) ? action.simulation : simulation));
      break; }
    default: {
      nextState = currentState;
      break; }
  }

  localStorage.setItem('simulations', JSON.stringify(nextState));

  return nextState;
};

export default simulationReducer;
