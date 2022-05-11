import { useState } from 'react'
import { FilesViewer } from './FilesViewer'
import { FileList, CurrentPath, OnBack, OnOpen } from '../src/shared/useHooks'

function App() {
  const useFileList = FileList()
  const useOnBack = OnBack()
  const useOnOpen = OnOpen('')

  const [path] = useState(CurrentPath)

  const [searchString, setSearchString] = useState('')
  const filteredFiles = useFileList.filter((s: { name: string }) => s.name.startsWith(searchString))

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
      <FilesViewer files={filteredFiles} onBack={useOnBack} onOpen={useOnOpen} name={''} directory={''} size={0} />
    </div>
  )
}

export default App
