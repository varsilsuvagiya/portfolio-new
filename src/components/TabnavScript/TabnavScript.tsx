'use client'

import { useEffect, useState } from 'react'

const TABNAV_SCRIPT_ID = 'tabnav-limited-widget-script'
const TABNAV_SCRIPT_SRC =
  'https://widget.tabnav.com/limited-widget.min.js.gz?req=1D_dRJ1r8VNHsiubzexcJjZSrQg9IA8g5CE'
const DEFAULT_WIDGET_COLOR = '#405ec3'

function getThemeAccentColor() {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--sc').trim()
  return color || DEFAULT_WIDGET_COLOR
}

function createWidgetConfig(color: string) {
  return {
    language: 'us-en',
    color,
    buttonColor: color,
    buttonSize: 'small',
    widgetSize: 'small',
    widgetLocation: 'left',
    buttonLocation: 'bottom',
  }
}

export default function TabnavScript() {
  const [widgetColor, setWidgetColor] = useState(DEFAULT_WIDGET_COLOR)

  useEffect(() => {
    const syncThemeColor = () => {
      const nextColor = getThemeAccentColor()
      setWidgetColor((currentColor) => (currentColor === nextColor ? currentColor : nextColor))
    }

    syncThemeColor()

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          syncThemeColor()
          break
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.getElementById(TABNAV_SCRIPT_ID)?.remove()

    const script = document.createElement('script')
    script.id = TABNAV_SCRIPT_ID
    script.src = TABNAV_SCRIPT_SRC
    script.defer = true
    script.setAttribute('tnv-data-config', JSON.stringify(createWidgetConfig(widgetColor)))
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [widgetColor])

  return (
    <noscript>
      JavaScript is required for <a href="https://tabnav.com/accessibility-widget">tabnav widget</a>{' '}
      to work properly.
    </noscript>
  )
}
