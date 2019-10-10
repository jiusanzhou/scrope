import React from 'react'

import {
    Popover, Button, Menu, MenuItem,
    Alignment, Divider, Icon, Card,
    InputGroup,
} from '@blueprintjs/core'

import { Select } from "@blueprintjs/select"

import Avatar from '../../components/avatar'

const _namespaces = [
    {
        id: 'a',
        name: '同顺云',
        icon: null,
        description: ''
    }
]

const _projects = [
    {
        id: 'a',
        name: '同顺云'
    },
    {
        id: 'b',
        name: '周筱鲁'
    }
]

const NSChooser = ({ cur }) => {
    return <Popover minimal>
        <Button rightIcon="expand-all" small minimal text={
            <span className="flex items-center"><Avatar className="mr-2" />同顺云</span>
        } />
        <Menu>{ _namespaces.map(i => <MenuItem text={
            <span className="flex items-center">
                <Icon icon="drag-handle-vertical" />
                <Avatar className="mr-2" />{ i.name }
            </span>
        }></MenuItem>) }</Menu>
    </Popover>
}

const ProjectChooser = () => {
    return <Select
    items={ _projects }
    itemPredicate={ (query, prj, _index, exactMatch) => {
        const normalizedTitle = prj.name.toLowerCase();
        const normalizedQuery = query.toLowerCase();
        
        if (exactMatch) {
            return normalizedTitle === normalizedQuery;
        } else {
            return `${prj.id}. ${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
        }
    } }
    itemRenderer={ (prj, { handleClick, modifiers, query }) => {
        return <MenuItem
        onClick={ handleClick }
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={ prj.id }
        text={ prj.name }></MenuItem>
    } }
    noResults={ <MenuItem disabled={true} text="无结果" /> }>
        <Button icon="grid-view" rightIcon="caret-down" small minimal text='同顺云' />
    </Select>
}

const Header = () => {
    return <div className="border-b flex w-full items-center h-10 px-5 bg-gray-200 border-b">
        <NSChooser />
        <Icon className='mx-2' icon='chevron-right' />
        <ProjectChooser />
    </div>
}

export default Header