import React, {useState, useEffect} from 'react';
import {Image, ImageStyle} from 'react-native';
import {validateImageUrl} from '../utils/utils';

type ValidatedImageProps = {
  uri: string;
  style: ImageStyle;
  onLoadEnd?: () => void;
};

const ValidatedImage: React.FC<ValidatedImageProps> = ({
  uri,
  style,
  onLoadEnd,
}) => {
  const [validUri, setValidUri] = useState<string | null>(null);

  useEffect(() => {
    const checkImage = async () => {
      const isValid = await validateImageUrl(uri);
      if (isValid) {
        setValidUri(uri);
      } else {
        setValidUri('https://via.placeholder.com/200?text=No+Image');
      }
    };

    checkImage();
  }, [uri]);

  return validUri ? (
    <Image
      testID="validated-image"
      source={{uri: validUri}}
      style={style}
      onLoadEnd={onLoadEnd}
    />
  ) : null;
};

export default ValidatedImage;
