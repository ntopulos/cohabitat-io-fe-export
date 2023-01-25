import { Injectable } from '@angular/core';
import { Included } from '../models/included.model';
import { ProjectPropertiesMeta } from '../models/project/projectproperties-meta.model';

@Injectable({
  providedIn: 'root'
})

export class PropertiesHelper {

  /**
   * getAllProperties
   * From a ProjectPropertiesMeta object, returns all properties with descriptions.
   */
  public getAllProperties(projectPropertiesMeta: ProjectPropertiesMeta) {

    let properties = projectPropertiesMeta.properties;
    let descriptions = projectPropertiesMeta.included;
    let output = [];

    properties.forEach(p => {
      output.push({
        format: p['attributes'],
        descriptions: [descriptions.find(x => x.id === p['relationships']['descriptions']['data'][0].id)['attributes']]
      });
    });

    return output;
  }

  /**
   * getProjectsProperties
   * From the project's Included returns an object with properties and their
   * details. Only properties of the project get returned.
   */
  public getProjectsProperties(objectIncluded: Included[]) {

    let properties = objectIncluded.filter(x => x.type === 'project-properties');
    let descriptions = objectIncluded.filter(x => x.type === 'project-properties-descriptions');
    let propertiesAd = objectIncluded.filter(x => x.type === 'properties_ad');

    let output = propertiesAd.map(pad => {
      let pattributes = properties.find(x => x.id === pad['relationships']['property']['data']['id'])

      let descriptionsOutput = [];
      pattributes['relationships']['descriptions']['data'].forEach(d => {
        descriptionsOutput.push(
          descriptions.find(x => x.id === d['id'])['attributes']
        )
      });

      return {
        value: pad['attributes']['value'],
        format: pattributes['attributes'],
        descriptions: descriptionsOutput,
      }
    });

    output.sort((a,b) => a.format.name.localeCompare(b.format.name));
    return output;
  }

}
