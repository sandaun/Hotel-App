import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {validateImageUrl} from '../utils/utils';

const ValidatedImage = ({uri, style}: {uri: string; style: any}) => {
  const [validUri, setValidUri] = useState(uri);

  useEffect(() => {
    const checkImage = async () => {
      const isValid = await validateImageUrl(uri);
      if (!isValid) {
        setValidUri('https://via.placeholder.com/200?text=No+Image');
      }
    };

    checkImage();
  }, [uri]);

  return (
    <Image testID="validated-image" source={{uri: validUri}} style={style} />
  );
};

export default ValidatedImage;
