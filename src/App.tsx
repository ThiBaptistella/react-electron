import { useState, useMemo } from 'react'
import { FilesViewer } from './FilesViewer'

const fs = window.require('fs')
const pathModule = window.require('path')

const { app } = window.require('@electron/remote')

const formatSize = (size: number) => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    Number((size / Math.pow(1024, i)).toFixed(2)) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

function App() {
  const [path, setPath] = useState(app.getAppPath())

  const files = useMemo(
    () =>
      fs
        .readdirSync(path)
        .map((file: any) => {
          const stats = fs.statSync(pathModule.join(path, file))
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory()
          }
        })
        .sort((a: { directory: any; name: string }, b: { directory: any; name: any }) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        }),
    [path]
  )

  const onBack = () => setPath(pathModule.dirname(path))
  const onOpen = (folder: any) => setPath(pathModule.join(path, folder))

  const [searchString, setSearchString] = useState('')
  const filteredFiles = files.filter((s: { name: string }) => s.name.startsWith(searchString))

  return (
    <div className="container mt-2">
      <h4>{path}</h4>
      <div className="form-group mt-4 mb-2">
        <input
          value={searchString}
          onChange={event => setSearchString(event.target.value)}
          className="form-control form-control-sm"
          placeholder="File search"
        />
      </div>
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} name={''} directory={''} size={0} />
    </div>
  )
}

export default App
