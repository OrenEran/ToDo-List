import React from 'react';
import { KeyContainer, BulletPoint } from './styles';


const KeyComponent = () => {
    return (
      <KeyContainer role='list'>
        <BulletPoint role='listitem'>
            Not Completed  
        </BulletPoint>
        <BulletPoint role='listitem' style={{ color: "red" }}>
            Completed  
        </BulletPoint>
      </KeyContainer>
    )
  };
  
  

export default KeyComponent;