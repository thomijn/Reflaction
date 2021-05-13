import React, {useState, useEffect} from 'react';
import ActivityPref from '../atoms/matchings/ActivityPref';

const SignUpMatching = ({setPhaseForm, setMatchingData}) => {
  const [phaseMatching, setPhaseMatching] = useState(0);
  const [activity, setActivity] = useState();

  useEffect(() => {
    if (activity) {
      setPhaseForm(3);
      setMatchingData({activity});
    }
  }, [activity]);

  const renderMatching = () => {
    switch (phaseMatching) {
      case phaseMatching:
        return <ActivityPref setActivity={setActivity} />;
      default:
        break;
    }
  };

  return renderMatching();
};

export default SignUpMatching;
