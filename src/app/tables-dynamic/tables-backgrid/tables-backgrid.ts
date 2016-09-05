import {Directive, ElementRef} from '@angular/core';
import {ConfigService} from '../../core/config';
declare var jQuery: any;
declare var Backbone: any;
declare var PageableCollection: any;
declare var Backgrid: any;

@Directive ({
  selector: '[tables-backgrid]'
})

export class TablesBackgrid {
  $el: any;
  configFn: any;

  constructor(el: ElementRef, config: ConfigService) {
    this.configFn = config;
    this.$el = jQuery(el.nativeElement);
    Backbone.PageableCollection = PageableCollection;
  }

  render(): void {
    let d = this;

    Backgrid.InputCellEditor.prototype.attributes.class = 'form-control form-control-sm';

    let Territory = Backbone.Model.extend({});

    let PageableTerritories = Backbone.PageableCollection.extend({
      model: Territory,
      url: 'assets/json/pageable-territories.json',
      state: {
        pageSize: 9
      },
      mode: 'client' // page entirely on the client side
    });

    let pageableTerritories = new PageableTerritories(),
      initialTerritories = pageableTerritories;
    function createBackgrid(collection): void {
      let columns = [{
        name: 'id', // The key of the model attribute
        label: 'ID', // The name to display in the header
        editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
        // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
        cell: Backgrid.IntegerCell.extend({
          orderSeparator: ''
        })
      }, {
        name: 'name',
        label: 'Name',
        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
        cell: 'string' // This is converted to 'StringCell' and a corresponding class in the Backgrid package namespace is looked up
      }, {
        name: 'pop',
        label: 'Population',
        cell: 'integer' // An integer cell is a number cell that displays humanized integers
      }, {
        name: 'url',
        label: 'URL',
        cell: 'uri' // Renders the value in an HTML <a> element
      }];
      if (d.configFn.isScreen('xs')) {
        columns.splice(3, 1);
      }
      let pageableGrid = new Backgrid.Grid({
        columns: columns,
        collection: collection,
        className: 'table table-striped table-editable no-margin mb-sm'
      });

      let paginator = new Backgrid.Extension.Paginator({

        slideScale: 0.25, // Default is 0.5

        // Whether sorting should go back to the first page
        goBackFirstOnSort: false, // Default is true

        collection: collection,

        controls: {
          rewind: {
            label: '<i class="fa fa-angle-double-left fa-lg"></i>',
            title: 'First'
          },
          back: {
            label: '<i class="fa fa-angle-left fa-lg"></i>',
            title: 'Previous'
          },
          forward: {
            label: '<i class="fa fa-angle-right fa-lg"></i>',
            title: 'Next'
          },
          fastForward: {
            label: '<i class="fa fa-angle-double-right fa-lg"></i>',
            title: 'Last'
          }
        }
      });

      jQuery('#table-dynamic').html('').append(pageableGrid.render().$el).append(paginator.render().$el);
    }

    jQuery(window).on('sn:resize', () => {
      createBackgrid(pageableTerritories);
    });

    createBackgrid(pageableTerritories);

    jQuery('#search-countries').keyup(function(): void {

      let $that = jQuery(this),
        filteredCollection = initialTerritories.fullCollection.filter((el) => {
          return ~el.get('name').toUpperCase().indexOf($that.val().toUpperCase());
        });
      createBackgrid(new PageableTerritories(filteredCollection, {
        state: {
          firstPage: 1,
          currentPage: 1
        }
      }));
    });

    pageableTerritories.fetch();
  }

  ngOnInit(): void {
    setTimeout(this.render());

  }
}
