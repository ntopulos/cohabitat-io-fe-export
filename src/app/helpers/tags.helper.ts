import { Injectable } from '@angular/core';
import { Included } from '../models/included.model';
import { TagsgroupMeta } from '../models/tagsgroup-meta.model';

@Injectable({
  providedIn: 'root'
})

export class TagsHelper {

  /**
   * getAllGroupsWithTags
   * From a TagsgroupMeta object, returns all groups and tags with
   * details.
   */
  public getAllGroupsWithTags(tagsgroupMeta: TagsgroupMeta) {

    let included = tagsgroupMeta['included'];
    let groups = tagsgroupMeta.tagsGroup;
    let groupsDetails = included.filter(x => x.type === 'tagsgroupdetails');
    let tags = included.filter(x => x.type === 'tags');
    let tagsDetails = included.filter(x => x.type === 'tagsdetails');

    return this.getGroupWithTags(groups, groupsDetails, tags, tagsDetails);
  }

  /**
   * getProjectsGroupsWithTags
   * From the project's Included returns an object with groups and (insidie)
   * tags. Only groups and tags of the project get returned.
   */
  public getProjectsGroupsWithTags(objectIncluded: Included[]) {

    let groups = objectIncluded.filter(x => x.type === 'tagsgroups');
    let groupsDetails = objectIncluded.filter(x => x.type === 'tagsgroupdetails');
    let tags = objectIncluded.filter(x => x.type === 'tags');
    let tagsDetails = objectIncluded.filter(x => x.type === 'tagsdetails');

    return this.getGroupWithTags(groups, groupsDetails, tags, tagsDetails);
  }

  /**
   * getGroupWithTags
   */
  private getGroupWithTags(groups:Array<any>, groupsDetails:Array<any>, tags:Array<any>, tagsDetails:Array<any>) {

    let output = groups.map(g => {

      let details = [];
      g['relationships']['details']['data'].forEach(d => {
        details.push(
          groupsDetails.find(x => x.id === d['id'])['attributes']
        )
      });

      let gtags = [];
      tags.filter(
        x => x.relationships.tags_group.data.id === g['id']
      ).forEach(
        t => {

          let gtdetails = [];
          t['relationships']['details']['data'].forEach(d => {
            gtdetails.push(
              tagsDetails.find(x => x.id === d['id'])['attributes']
            )
          });

          gtags.push({
            id: t['id'],
            slug: t['attributes']['slug'],
            details: gtdetails,
          })
        }
      );

      return {
        id: g.id,
        slug: g['attributes'].slug,
        details: details,
        tags: gtags,
      }
    })

    // Sort alphabetically
    output.sort((a,b) => a.slug.localeCompare(b.slug));

    // Put "Organisation" in front
    output.sort(function(x,y) { return x.slug === 'organisation' ? -1 : y.slug == 'organisation' ? 1 : 0; });

    return output;
  }
}

