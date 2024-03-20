export interface ImageViewerProps {
  urlList?: string[]
  zIndex?: number
  initialIndex?: number
  infinite?: boolean
  hideOnClickModal?: boolean
  teleported?: boolean
  closeOnPressEscape?: boolean
  zoomRate?: number
  minScale?: number
  maxScale?: number
  crossorigin?: '' | 'anonymous' | 'use-credentials'
}
