import React, { useState } from 'react'

import {
    ButtonGroup, Button, Icon,
    Position, Tooltip, Tree,
    Intent,
    Classes,
} from '@blueprintjs/core'

import {
    Cell,
    Column,
    ColumnHeaderCell,
    CopyCellsMenuItem,
    IMenuContext,
    SelectionModes,
    RegionCardinality,
    TruncatedFormat,
    Table,
    Utils,
} from "@blueprintjs/table"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { mime2icon } from '../../utils/helper'

const { log } = require('../../testdata/jianshu.json')

const _listModes = [
    {
        type: 'list',
        icon: 'th-list',
        label: '列表'
    },
    {
        type: 'tree',
        icon: 'folder-open',
        label: '树型'
    }
]

const UploadHAR = ({ onContentChange }) => {
    const filereader = new FileReader()
    filereader.onloadend = () => {
        try { onContentChange(JSON.parse(filereader.result)) } catch (e) {}
    }
    return <input _ref='__har__uploader' type="file" accept='.har' style={{display: 'none'}} />
}

const ListTitleBar = ({ capturing = false, mode = 'list', setMode = () => {} }) => {
    return <div className="flex p-2">
        {/* absolute hidden group-hover:flex right-0  */}
        <UploadHAR />
        <Tooltip content='上传HAR'>
            <Button small icon='upload' onClick={ () => {} } disabled={ capturing } />
        </Tooltip>
        <ButtonGroup className="ml-2">
            { _listModes.map( i => <Tooltip content={ i.label }>
                <Button small icon={ i.icon } onClick={ () => setMode(i.type) } active={ mode === i.type } />
            </Tooltip> ) }
        </ButtonGroup>
    </div>
}

const generateListNodes = ({ entries }) => {

}

const columns = [
    {
        name: '',
        key: 'response.content.mimeType',
        width: 35,
        fn: ({ response: { content: { mimeType } } }) => {
            return <span className="bp3-icon text-sm">{ mime2icon(mimeType.split(';')[0]) }</span>
        }
    },
    {
        name: '方法',
        key: 'request.method',
        width: 50,
        fn: ({ request: { method } }) => method
    },
    {
        name: '状态',
        key: 'response.status',
        width: 50,
        fn: ({ response: { status } }) => status
    },
    {
        name: '主机',
        key: 'request.url',
        width: 150,
        fn: ({ request: { url } }) => (new URL(url)).host
    },
    {
        name: '路径',
        key: 'request.url',
        width: 200,
        fn: ({ request: { url } }) => {
            let _ = new URL(url)
            return  _.pathname + _.search
        }
    },
    {
        name: '开始',
        key: 'startedDateTime',
        width: 75,
        fn: ({ startedDateTime }) => {
            let t = new Date(startedDateTime)
            return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
        }
    },
    {
        name: '耗时',
        key: 'time',
        width: 75,
        fn: ({ time }) => time
    },
    {
        name: '大小',
        key: 'response.bodySize',
        width: 75,
        fn: ({ response: { bodySize } }) => bodySize
    }
]

const _getCellData = (rowIndex, columnIndex) => {
    return columns[columnIndex].fn(log.entries[rowIndex])
}

const _generateTableColumn = ({ index, name }) => {
    const cellRenderer = (rowIndex, columnIndex) => {
        let v = _getCellData(rowIndex, columnIndex)
        let intent
        if ( columns[columnIndex].key === 'response.status' ) {
            if ( v == 200 ) {
                intent = 'success'
            } else if ( v < 300 ) {
                intent = 'warning'
            } else {
                intent = 'danger'
            }
        }
        return <Cell intent={ intent }>{ v }</Cell>
    }
    const columnHeaderCellRenderer = () => <ColumnHeaderCell name={name} />
    return <Column
        cellRenderer={cellRenderer}
        columnHeaderCellRenderer={columnHeaderCellRenderer}
        key={index}
        name={name} />
}

const ViewList = () => {
    return <Table
    className="text-base"
    enableRowResizing={ false }
    selectionModes={ SelectionModes.ROWS_ONLY }
    columnWidths={ columns.map(i => i.width) }
    numRows={ log.entries.length }>
        { columns.map((col, index) => _generateTableColumn({index, ...col})) }
    </Table>
}


const _urlParse = ( url ) => {
    let rs = []
    let tmp = ""
    for (let i=0; i<url.length; i++) {
        if ( url[i] === '/' && url[i+1] !== '/' && url[i-1] !== '/' ) {
            rs.push(tmp)
            tmp = ""
        } else {
            tmp = tmp + url[i]
        }
    }
    if ( tmp !== "" ) rs.push(tmp)
    return rs
}

// a.b.c
// a.b.d
// a.c.c
// ======>
// a -> b -> c
//   -> b -> d
//   -> c -> c

const _genrateTreeItem = (parts) => {
    let h = parts.length
    if ( h === 1 ) {
        return { label: parts[0] }
    } else {
        return {
            label: parts[0],
            childNodes: _genrateTreeItem(parts.slice(1))
        }
    }
}

const generateTreeNodes = ({ entries }) => {
    // return entries.map(i => _genrateTreeItem(i))
    // 路径分割
    let hosts = {}
    entries.forEach(e => {
        // split path with '/'
        let { request: { url } } = e
        let parts = _urlParse(url)
    })
    return [
        {
            id: 0,
            icon: "folder-close",
            label: "Folder 0",
        },
        {
            id: 1,
            icon: "folder-close",
            isExpanded: true,
            label: (
                <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
                    Folder 1
                </Tooltip>
            ),
            childNodes: [
                {
                    id: 2,
                    icon: "document",
                    label: "Item 0",
                    secondaryLabel: (
                        <Tooltip content="An eye!">
                            <Icon icon="eye-open" />
                        </Tooltip>
                    ),
                },
                {
                    id: 3,
                    icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,
                    label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
                },
                {
                    id: 4,
                    hasCaret: true,
                    icon: "folder-close",
                    label: (
                        <Tooltip content="foo" position={Position.RIGHT}>
                            Folder 2
                        </Tooltip>
                    ),
                    childNodes: [
                        { id: 5, label: "No-Icon Item" },
                        { id: 6, icon: "tag", label: "Item 1" },
                        {
                            id: 7,
                            hasCaret: true,
                            icon: "folder-close",
                            label: "Folder 3",
                            childNodes: [
                                { id: 8, icon: "document", label: "Item 0" },
                                { id: 9, icon: "tag", label: "Item 1" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            hasCaret: true,
            icon: "folder-close",
            label: "Super secret files",
            disabled: true,
        },
    ]
}

const ViewTree = () => {
    return <Tree
    contents={ generateTreeNodes(log) }
    className={Classes.ELEVATION_0} />
}

const _views = {
    list: ViewList,
    tree: ViewTree,
}

const RequestsList = () => {

    const [ mode, setMode ] = useState('list')

    let view = _views[mode]

    return <div className="group flex flex-col inset-0 p-0 overflow-hidden absolute">
        <ListTitleBar mode={ mode } setMode={ setMode } />
        { view && React.createElement(view, {}) }
    </div>
}

export default RequestsList