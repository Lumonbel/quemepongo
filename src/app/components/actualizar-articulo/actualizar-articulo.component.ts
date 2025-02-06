import { Component, OnInit } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ArticuloDTO } from '../../models/articulo-dto';
import { ArticulosService } from '../../services/articulos.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

interface Prenda {
  id: string;
  ropa: string;
}
interface Prendas { [key: string]: Prenda; }

interface SubCategoria {
  id: string;
  nombre: string;
}
interface SubCategorias {
  [key: string]: SubCategoria[];
}

@Component({
  selector: 'app-actualizar-articulo',
  imports: [BtAtrasComponent, ReactiveFormsModule, DropdownModule, FormsModule, CommonModule],
  templateUrl: './actualizar-articulo.component.html',
  styleUrl: './actualizar-articulo.component.css'
})

export class ActualizarArticuloComponent implements OnInit {
  formulario!: FormGroup;
  articulo: any = null;
  prendasSel: Prenda[] = [];
  prendaSeleccionada: Prenda | undefined;
  mostrarDiv: string = '';
  subcategorias: SubCategorias = {};
  subcategoriasOptions: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private articuloService: ArticulosService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      camisa: ['', Validators.required],
      talla: ['', Validators.required],
      color: ['', Validators.required],
      marca: ['', Validators.required],
      temporada: ['', Validators.required],
      material: ['', Validators.required],
      estado: ['', Validators.required],
      genero: ['', Validators.required],
      estampado: ['', Validators.required],
      largo: ['', Validators.required],
      grosor: ['', Validators.required],
      tipoAlmacenamiento: ['', Validators.required],
      capacidad: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required]
    });


    this.prendasSel = [
      { id:'1', ropa: 'Complementos' },
      { id:'2', ropa: 'Ropa' },
      { id:'3', ropa: 'Zapatos' },
    ];

    this.subcategorias = {
      '1': [
        { id: '1-1', nombre: 'Bolsos' },
        { id: '1-2', nombre: 'Bufandas' },
        { id: '1-3', nombre: 'Cinturones' },
        { id: '1-4', nombre: 'Corbatas' },
        { id: '1-5', nombre: 'Gorras' },
        { id: '1-6', nombre: 'Guantes' },
      ],
      '2': [
        { id: '2-1', nombre: 'Camisas' },
        { id: '2-2', nombre: 'Chaquetas' },
        { id: '2-3', nombre: 'Faldas' },
        { id: '2-4', nombre: 'Jerseys' },
        { id: '2-5', nombre: 'Pantalones' },
        { id: '2-6', nombre: 'Ropa de baño' },
        { id: '2-7', nombre: 'Sudaderas' },
        { id: '2-8', nombre: 'Vestidos' },
      ],
    };
    this.cargarArticulo();
    this.subcategoriasOptions = this.transformSubcategorias(this.subcategorias);
    
  }

  onPrendaChange(event: any) {
    this.prendaSeleccionada = event.value;
    this.subcategoriasOptions = this.transformSubcategorias({
      [this.getCategoriaId(event.value.ropa)]: this.subcategorias[this.getCategoriaId(event.value.ropa)] || [],
    });
  }

  cargarArticulo(): void {
    this.articuloService.findById(1).subscribe({
      next: (data) => {
        
        this.articulo = data;
        
        //console.log('Artículo:', this.articulo);
        this.inicializarFormulario();
        //console.log('Despues de inicializar el formularip:', this.articulo);
        this.setPrendaSeleccionada();
        //console.log('Despues de set prenda:', this.articulo);
        
      },
      error: (err) => {
        console.error('Error al cargar el artículo:', err);
      },
    });
  }

  inicializarFormulario(): void {
    if (this.articulo) {
      this.formulario = this.formBuilder.group({
        id: [this.articulo.id],
        tipo: [this.articulo.tipo],
        color: [this.articulo.color],
        marca: [this.articulo.marca],
        material: [this.articulo.material],
        temporada: [this.articulo.temporada],
        imagen: [this.articulo.imagen],
        estado: [this.articulo.estado],
        publicado: [this.articulo.publicado],
        descripcion: [this.articulo.descripcion],
        genero: [this.articulo.genero],
        activo: [this.articulo.activo],
        talla: [this.articulo.talla],
        largo: [this.articulo.largo],
        grosor: [this.articulo.grosor],
        capacidad: [this.articulo.capacidad],
        tipoAlmacenamiento: [this.articulo.tipoAlmacenamiento],
        estampado: [this.articulo.estampado],
        precio: [this.articulo.precio],
      });

      this.formulario.patchValue(this.articulo);
    } else {
      console.error('El artículo es null');
    }
  }

  transformSubcategorias(subcategorias: SubCategorias): any[] {
    const options: any[] = [];
    for (const key in subcategorias) {
      if (subcategorias.hasOwnProperty(key)) {
        options.push(...subcategorias[key].map(subcat => ({ label: subcat.nombre, value: subcat.id })));
      }
    }
    return options;
  }

  setPrendaSeleccionada(): void {
    if (this.articulo) {
      const subcategoriaId = this.articulo.tipo; // Obtiene la subcategoría guardada en BD
      const categoria = this.getCategoriaFromSubcategoria(subcategoriaId); // Obtiene la categoría correspondiente
      console.log('Categoría:', categoria);
      console.log('Subcategoría:', subcategoriaId);
  
      // Asignamos la categoría en el primer dropdown
      this.prendaSeleccionada = this.prendasSel.find(prenda => prenda.ropa === categoria);
  
      if (this.prendaSeleccionada) {
        const categoriaId = this.getCategoriaId(this.prendaSeleccionada.ropa);
        
        // Filtramos las subcategorías de la categoría detectada
        this.subcategoriasOptions = this.transformSubcategorias({
          [categoriaId]: this.subcategorias[categoriaId] || []
        });
  
        // Aseguramos que el segundo dropdown tenga la subcategoría seleccionada
        this.articulo.tipo = this.subcategoriasOptions.find(sub => sub.value === subcategoriaId)?.value || '';
      }
    }
  }

  getCategoriaFromSubcategoria(subcategoriaId: string): string {

    console.log('Subcategoría:', subcategoriaId);
    for (const key in this.subcategorias) {
      /*
      console.log('Key:', key);
      if(key==="1"){
        return "Complementos";
      }else if(key==="2"){
        return "Ropa";
      }else if(key==="3"){  
        return "Zapatos";
      }*/
      if (this.subcategorias[key].some(subcat => subcat.id === subcategoriaId)) {
        
        return this.prendasSel.find(prenda => prenda.ropa === this.mapCategoriaId(key))?.ropa || '';
      }
    }
    return '';
  }

  mapCategoriaId(id: string): string {
    const categoriasMap: { [key: string]: string } = {
      '1': 'Complementos',
      '2': 'Ropa',
      '3': 'Zapatos',
    };
    return categoriasMap[id] || '';
  }

  getFilteredSubcategorias(): any[] {
    if (!this.prendaSeleccionada) return [];
    const categoriaId = this.getCategoriaId(this.prendaSeleccionada.ropa);
    return this.transformSubcategorias({
      [categoriaId]: this.subcategorias[categoriaId] || [],
    });
  }

  getCategoriaId(nombre: string): string {
    const categoriasMap: { [key: string]: string } = {
      'Complementos': '1',
      'Ropa': '2',
      'Zapatos': '3',
    };
    return categoriasMap[nombre] || '';
  }
}

/*
export class ActualizarArticuloComponent implements OnInit {
  formulario!:FormGroup;
  articulo:   ArticuloDTO | null=null;
  prendasSel: Prenda[] = [];
  prendaSeleccionada: Prenda | undefined;
  mostrarDiv: string = '';
  subcategorias: SubCategorias = {};
  subcategoriasOptions: any[] = [];
  constructor(private formBuilder: FormBuilder, private articuloService: ArticulosService ){}
    ngOnInit(): void{
      this.cargarArticulo();
      
    this.prendasSel = [
      { ropa: 'Complementos' },
      { ropa: 'Ropa' },
      { ropa: 'Zapatos' },
    ];
    this.subcategorias = {
      '1': [
        { id: '1-1', nombre: 'Bolsos' },
        { id: '1-2', nombre: 'Bufandas' },
        { id: '1-3', nombre: 'Cinturones' },
        { id: '1-4', nombre: 'Corbatas' },
        { id: '1-5', nombre: 'Gorras' },
        { id: '1-6', nombre: 'Guantes' }
      ],
      '2': [
        { id: '2-1', nombre: 'Camisas' },
        { id: '2-2', nombre: 'Chaquetas' },
        { id: '2-3', nombre: 'Faldas' },
        { id: '2-4', nombre: 'Jerseys' },
        { id: '2-5', nombre: 'Pantalones' },
        { id: '2-6', nombre: 'Ropa de baño' },
        { id: '2-7', nombre: 'Sudaderas' },
        { id: '2-8', nombre: 'Vestidos' }
      ]
    };
    // const selectedOption = this.prendasSel.find(
    //   (prenda) => prenda.ropa === value.ropa
    // );
    this.subcategoriasOptions = this.transformSubcategorias(this.subcategorias);
  }
  onPrendaChange(event: any) {
    this.prendaSeleccionada = event.value;
    
    // Filtrar subcategorías según la nueva selección
    this.subcategoriasOptions = this.transformSubcategorias({
      [this.getCategoriaId(event.value.ropa)]: this.subcategorias[this.getCategoriaId(event.value.ropa)] || []
    });
  }
  
  // Nueva función para obtener el ID de la categoría
  getCategoriaId(nombre: string): string {
    const categoriasMap: { [key: string]: string } = {
      'Complementos': '1',
      'Ropa': '2',
      'Zapatos': '3'
    };
    return categoriasMap[nombre] || '';
  }

  cargarArticulo():void{
    this.articuloService.findById(1).subscribe({
      next: (data) => {
        this.articulo! = data;
        this.inicializarFormulario();
        this.setPrendaSeleccionada();
      },
      error: (err) => {
        console.error('Error al cargar el artículo:', err);
      }
    });
  }
  inicializarFormulario(): void {
    if (this.articulo) {
      this.formulario = this.formBuilder.group({
        
        id: [this.articulo!.id],
        tipo: [this.articulo!.tipo],
        color: [this.articulo!.color],
        marca: [this.articulo!.marca],
        material: [this.articulo!.material],
        temporada: [this.articulo!.temporada],
        imagen: [this.articulo!.imagen],
        estado: [this.articulo!.estado],
        publicado: [this.articulo!.publicado],
        descripcion: [this.articulo!.descripcion],
        genero: [this.articulo!.genero],
        activo: [this.articulo!.activo],
        talla: [this.articulo!.talla],
        largo: [this.articulo!.largo],
        grosor: [this.articulo!.grosor],
        capacidad: [this.articulo!.capacidad],
        tipoAlmacenamiento: [this.articulo!.tipoAlmacenamiento],
        estampado: [this.articulo!.estampado],
        precio: [this.articulo!.precio]
      });

      this.formulario.patchValue(this.articulo!);
    } else {
      console.error('El artículo es null');
    }
  }
  transformSubcategorias(subcategorias: SubCategorias): any[] {
    const options: any[] = [];
    for (const key in subcategorias) {
      if (subcategorias.hasOwnProperty(key)) {
        options.push(...subcategorias[key].map(subcat => ({ label: subcat.nombre, value: subcat.id })));
      }
    }
    return options;
  }

  setPrendaSeleccionada(): void {
    if (this.articulo) {
      const subcategoriaId = this.articulo.tipo; // Subcategoría del artículo
      const categoria = this.getCategoriaFromSubcategoria(subcategoriaId); // Obtener categoría correcta
      this.prendaSeleccionada = this.prendasSel.find(prenda => prenda.ropa === categoria);
    }
  }

  getCategoriaFromSubcategoria(subcategoriaId: string): string {
    for (const key in this.subcategorias) {
      if (this.subcategorias[key].some(subcat => subcat.id === subcategoriaId)) {
        return this.prendasSel.find(prenda => prenda.ropa === this.mapCategoriaId(key))?.ropa || '';
      }
    }
    return '';
  }
  mapCategoriaId(id: string): string {
    const categoriasMap: { [key: string]: string } = {
      '1': 'Complementos',
      '2': 'Ropa',
      '3': 'Zapatos'
    };
    return categoriasMap[id] || '';
  }

}


interface Prenda {
  ropa: string;
}

interface SubCategoria {
  id: string;
  nombre: string;
}

interface SubCategorias {
  [key: string]: SubCategoria[];
}

@Component({
  selector: 'app-actualizar-articulo',
  templateUrl: './actualizar-articulo.component.html',
  styleUrl: './actualizar-articulo.component.css',
})*/
