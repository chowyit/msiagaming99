import Image, { ImageLoaderProps, ImageProps } from 'next/image';
import client from '../../../sanityClient';
import {
  ImageUrlBuilder,
  useNextSanityImage,
  UseNextSanityImageBuilderOptions,
} from 'next-sanity-image';
import { ImageFragmentFragment } from '../../graphql/generates';

interface IProps extends Omit<ImageProps, 'src'> {
  imageProps: ImageFragmentFragment;
  imageBuilder?: (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) => ImageUrlBuilder;
  className?: string;
}

const SanityImage = ({ alt, className, imageProps, imageBuilder, ...props }: IProps) => {
  const nextSanityImageProps = useNextSanityImage(client, imageProps, {
    imageBuilder: imageBuilder ? imageBuilder : (imageUrlBuilder) => imageUrlBuilder.quality(100),
  });

  const myImageLoader = ({ src, width: loaderWidth, quality }: ImageLoaderProps) => {
    return `${src}&w=${loaderWidth * 2}&q=${quality || 100}`;
  };

  return (
    <Image
      {...nextSanityImageProps}
      {...props}
      loader={myImageLoader}
      alt={alt}
      className={className}
      {...(imageProps?.asset?.metadata?.lqip &&
        props.width &&
        props.width > 40 && {
          placeholder: 'blur',
          blurDataURL: imageProps.asset.metadata.lqip,
        })}
    />
  );
};

export default SanityImage;
