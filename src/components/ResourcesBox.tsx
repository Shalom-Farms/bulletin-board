'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Resource } from "../types";
import { RichTexts } from "./Block";
import Labels from "./Labels";

const ICONS: { [key: string]: string} = {
    "Important Documents": "🔖",
    "Fun Finds": "✨",
    "Resource": "💭"
}

const sortOrder: { [key: string]: number}  = {
    "Important Documents": 0,
    "Fun Finds": 2,
    "Resource": 1
}

const Filters = (props: { onFilter: Function, labels: { color: string, name: string }[], filterObj?: { color: string, name: string }}) => {
    const { labels, filterObj } = props;

    const [open, setOpen] = useState<boolean>(false);
   

    return <div>
    <details className="dropdown details-reset details-overlay d-inline-block" onClick={(e) => { e.preventDefault(); setOpen(!open); }} open={open}>
        <summary className="btn" aria-haspopup="true">
            {filterObj && <span className={`Label ${filterObj.color ? `Label--${filterObj.color}`: ""}`}>{filterObj.name}</span>}
            {!filterObj && "Filter"}
        <div className="dropdown-caret"></div>
        </summary>

        <ul className="dropdown-menu dropdown-menu-se" style={{ maxHeight: "200px", overflowY: "scroll"}}>
            {labels.map((label, i) => (
                <li key={`filter-label-${i}`} style={{ cursor: "pointer"}}>
                    <a onClick={(e) => { props.onFilter(label); }} className="dropdown-item"><span className={`Label ${label.color ? `Label--${label.color}`: ""}`}>{label.name}</span></a></li>
            ))}
        </ul>
    </details>
    {filterObj && <div className="d-inline-block ml-3" ><a onClick={() => props.onFilter(null)} className="color-fg-subtle text-light" style={{ textDecoration: "none", cursor: "pointer" }}>Clear filter</a></div>}
</div>
}

export default function ResourcesBox(props: { resources: Resource[], showViewAll?: boolean, showFilter?: boolean }) {
    const { resources } = props;

    const [filter, setFilter] = useState<{ color: string, name: string }|null>()

    const uniqueLabels = Object.values(resources.reduce((result: { [key: string]: { color: string, name: string }}, resource: Resource) => {
        resource.properties.Tag.multi_select.forEach(select => {
            result[select.name] = { name: select.name, color: select.color }
        })

        return result
    }, {}))

    let filteredResources = resources;
    const filterObj = uniqueLabels.find(label => label.name === filter?.name )

    if(filter) {
        filteredResources = resources.filter(resource => {
            return resource.properties.Tag.multi_select.some((select) => select.name === filter.name)
        })
    }

    const groupedResources = filteredResources.reduce((result: { [key: string]: Resource[] }, resource: Resource) => {
        const type = resource.properties.Type.select.name;
        if(!result[type]) {
          result[type] = [resource]
        } else {
          result[type].push(resource)
        }
    
        return result
      }, {})

    return <>
    {props.showFilter && <Filters labels={uniqueLabels} onFilter={setFilter} filterObj={filterObj}/>}
    <nav className="SideNav border mt-5 rounded-2">
    <div className="SideNav-item">
      <h2 className="h2">ℹ Resources</h2>
    </div>
    {Object.keys(groupedResources).sort((a, b) => sortOrder[a] - sortOrder[b]).map((type, i) => (<>
        <div key={`resource-${i}`} id={type.replace(" ", "-")} className="SideNav-item color-bg-default h4">{ICONS[type]} {type}</div>
        <nav className="SideNav color-bg-default border-top fade-out" >
            <div className="py-3 pl-md-6 pl-3 pr-3 pr-md-6" style={props.showViewAll ? { maxHeight:  "300px", overflowY: "scroll" } : undefined}>{
            groupedResources[type].map((resource,j) => (
                <a key={`resource-${i}-${j}`} className="SideNav-subItem color-fg-default mb-2" target="_blank" rel="noreferrer" href={resource.properties.Url.url}>
                    <div className="text-semibold"><RichTexts rich_text={resource.properties.Name.title} /><span className="mr-2"></span><svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 512 512"><path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"/></svg></div>
                    <div className="color-fg-subtle"><RichTexts rich_text={resource.properties.Description.rich_text}/></div>
                    <Labels labels={resource.properties.Tag.multi_select} />
                </a>
    
        ))}</div></nav>
    </>))}
    {props.showViewAll && <div className="SideNav-item color-bg-default text-right">
        <Link className="btn btn-secondary mr-1" href="/resources">
            View All
        </Link>
    </div>}
  </nav></>
}


