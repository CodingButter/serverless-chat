import React, { Suspense, useRef } from 'react'

function Spinner() {
  return <div className="animate-spin rounded-full max-h-8 max-w-8 w-4/5 h-4/5 border-b-2 border-gray-900" />
}

interface ImageProps extends React.ComponentPropsWithRef<'img'> {
  src: string
  fallback?: React.ReactNode | null
  alt: string
}

export default function Image({ src, fallback, alt, ...rest }: ImageProps) {
  const [loaded, setLoaded] = React.useState(false)
  const loadingComponent =
    fallback ||
    ((
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    ) as React.ReactNode)
  return (
    <>
      {!loaded && loadingComponent}
      <img onLoad={() => setLoaded(true)} src={src} alt={alt} {...rest} />
    </>
  )
}
