import { Injectable } from '@nestjs/common';
import { FindConditions, ObjectLiteral, In, FindManyOptions, Like } from 'typeorm';

@Injectable()
export class SearchBuilderService<T> {
    build(searchOptions: SearchOptions<T>, idName?: string): FindManyOptions<T> {
        const sanitizedSearchOptions = this._arrayifyIds(searchOptions);
        const optionsSelect = this._addSelect({}, sanitizedSearchOptions);
        const optionsOrder = this._addOrder(optionsSelect, sanitizedSearchOptions);
        const optionsTake = this._addTake(optionsOrder, sanitizedSearchOptions);
        const optionsSkip = this._addSkip(optionsTake, sanitizedSearchOptions);
        const baseWhere = this._addWhere(optionsSkip, sanitizedSearchOptions);
        const withSearchIds = this._addSearchByIds(baseWhere, sanitizedSearchOptions, idName);
        const withSearchString =  this._addSearchBySearchString(withSearchIds, sanitizedSearchOptions);
        const addRelations = this._addRelations(withSearchString, sanitizedSearchOptions);

        return addRelations;
    }

    private _arrayifyIds = (searchOptions: SearchOptions<T>): SearchOptions<T> => {
        const ids = this._getIds(searchOptions);
        return ids ? { ...searchOptions, ids: ids } : { ...searchOptions }
    }

    private _getIds = (searchOptions: SearchOptions<T>): Array<number> | Array<string> => {
        if(searchOptions?.ids && Array.isArray(searchOptions.ids)) {
            return searchOptions.ids;
        } 

        return []; 
    }
        
    private _addSelect = (options: FindManyOptions<T>, searchOptions: SearchOptions<T>): FindManyOptions<T> =>
        searchOptions.select ? {...options, select: searchOptions.select} : {...options};

    private _addOrder = (options: FindManyOptions<T>, searchOptions: SearchOptions<T>): FindManyOptions<T> =>
        searchOptions.order ? {...options, order: searchOptions.order} : {...options};

    private _addTake = (options: FindManyOptions<T>, searchOptions: SearchOptions<T>): FindManyOptions<T> =>
        searchOptions?.take > 0 ? {...options, take: searchOptions.take } : {...options};

    private _addSkip = (options: FindManyOptions<T>, searchOptions: SearchOptions<T>): FindManyOptions<T> =>
        searchOptions?.skip && searchOptions?.skip > 0 ?
            {...options, skip: searchOptions.skip } : {...options};

    private _addWhere = (options: FindManyOptions<T>, searchOptions: SearchOptions<T>): FindManyOptions<T> =>
        searchOptions.where ? {...options, where: searchOptions.where} : {...options, where: {}};

    private _addRelations = (options: FindManyOptions<T>, searchOptions: SearchOptions<T>): FindManyOptions<T> =>
        searchOptions.relations ? {...options, relations: searchOptions.relations} : {...options};

    private _addSearchByIds = (options: FindManyOptions<T>, searchOptions: SearchOptions<T>, idName = 'id'): FindManyOptions<T> => {
        const tempWhere = {
            ...options.where as FindManyOptions<T>,
            [idName]: In(searchOptions.ids as Array<string>)
        }

        return options.where !== 'string' && searchOptions?.ids?.length > 0 ?
            { ...options, where: tempWhere } : { ...options };
    }

    private _addSearchBySearchString(options: FindManyOptions<T>, searchOptions: SearchOptions<T>): FindManyOptions<T> {
        if(
            searchOptions?.search?.search_types?.length > 0
            && searchOptions?.search?.search_string?.length > 0
        ) {
            const currentConditions = typeof options.where !== 'string' ? {...options.where} : undefined;
            options.where = [];

            for(const type of searchOptions.search.search_types) {
                const obj = !!currentConditions && typeof currentConditions !== 'string' ?
                    {...currentConditions, [type]: Like(`%${searchOptions.search.search_string}%`)}
                        :
                    {[type]: Like(`%${searchOptions.search.search_string}%`)};

                (options.where as Array<any>).push(obj);
            }
        }

        return options;
    }
}

export interface SearchOptions<T> {
    select?: (keyof T)[];
    search?: {
        search_types: Array<string>,
        search_string: string
    };
    where?: FindConditions<T>[] | FindConditions<T> | ObjectLiteral | string;
    order?: { [P in keyof T]?: "ASC" | "DESC" | 1 | -1 };
    skip?: number;
    take?: number;
    ids?: Array<string> | Array<number>,
    relations?: Array<string>
}