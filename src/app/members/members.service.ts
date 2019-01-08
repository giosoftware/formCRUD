import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Member } from './classes/member';

export type icons = '' | 'create' | 'checkmark' | 'close';
export type msgstyle = 'success' | 'danger';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private URL = environment.API_URL;
  public arrayUsers: Array<Member> = []; // Array que almacenará los socios
  private editMode = false; // Indica si se está editando un socio
  public message = ''; // Mensaje a mostrar al usuario
  public messageType = ''; // Tipo de mensaje
  public dniInputIcon: icons = '';
  public user = { id: '', nombre: '', dni: '' };

  /**
   * Cargamos la lista de socios
   * @param http Inyectamos HttpClient en el constructor para tenerlo disponible.
   */
  constructor(private http: HttpClient) {
    this.readRecord();
  }

  /**
   * HTTP Methods
   */
  private checkDni$(dni): Observable<any> {
    return this.http.post(this.URL + 'check_dni.php', dni);
  }

  private deleteRecord$(id): Observable<any> {
    return this.http.post(this.URL + 'delete_record.php', id);
  }

  private editRecord$(member: Member): Observable<any> {
    return this.http.post(this.URL + 'edit_record.php', member);
  }

  private readRecord$(): Observable<Member[]> {
    return this.http.get<Member[]>(this.URL + 'read_records.php');
  }

  private saveRecord$(member: Member): Observable<any> {
    return this.http.post(this.URL + 'save_record.php', member);
  }
  /*********/

  /**
   * Suscripción a la respuesta de checkDni$ para mostrar el icono apropiado
   * mientras se teclea el dni del socio.
   */
  public checkDni(): void {
    this.checkDni$(this.user.dni).subscribe(
      $res => (this.dniInputIcon = $res === '0' ? 'checkmark' : 'close'),
      err => this.showmessage('Ha habido un error: ' + err.error.text, 'danger')
    );
  }

  /**
   * Comprueba que no existe ningún socio con el mismo dni introducido por el
   * usuario.
   */
  public isDNIRepeated(): boolean {
    for (let i = 0; i < this.arrayUsers.length; i++) {
      if (this.arrayUsers[i].dni === this.user.dni && !this.editMode) {
        return true;
      }
    }

    return false;
  }

  /**
   * Valida la información introducida por el usuario antes de guardar el
   * registro.
   */
  public validateRecord() {
    if (this.user.dni === '' || this.user.nombre === '') {
      this.showmessage('El DNI y/o el nombre están vacios', 'danger');
    } else if (this.isDNIRepeated()) {
      this.showmessage('El DNI está repetido', 'danger');
    } else {
      if (this.editMode) {
        this.editRecord();
      } else {
        const user = new Member(this.user.dni, this.user.nombre);
        this.saveRecord(user);
      }
    }
  }

  /**
   * Suscripción a la respuesta de deleteRecord$. Actualiza la lista de socios
   * si se ha logrado borrar el registro.
   */
  deleteUser(id) {
    this.deleteRecord$(id).subscribe(
      res => {
        if (res === '0') {
          this.readRecord();
          this.showmessage('El registro se eliminó correctamente', 'success');
        } else {
          this.showmessage('Ha habido un error con código ' + res, 'danger');
        }
      },
      err => this.showmessage('Ha habido un error: ' + err.error.text, 'danger')
    );
  }

  /**
   * Suscripción a la respuesta de editRecord$. Si se ha logrado guardar el
   * usuario editado, guarda su nombre en la variable de sesión y recarga la
   * lista de socios.
   */
  editRecord() {
    this.editRecord$(this.user).subscribe(
      res => {
        if (res === '0') {
          this.showmessage('El registro se guardó correctamente', 'success');
          sessionStorage.setItem('lastEdited', this.user.nombre);
          this.resetForm();
          this.editMode = false;
          this.readRecord();
        } else {
          this.showmessage('Ha habido un error con código ' + res, 'danger');
        }
      },
      err => this.showmessage('Ha habido un error: ' + err.error.text, 'danger')
    );
  }

  /**
   * Carga en el objeto user los datos del socio que se quiere editar.
   * @param id Identificador del socio.
   */
  editUser(id) {
    for (let i = 0; i < this.arrayUsers.length; i++) {
      if (this.arrayUsers[i].id === id) {
        this.user.id = this.arrayUsers[i].id;
        this.user.nombre = this.arrayUsers[i].nombre;
        this.user.dni = this.arrayUsers[i].dni;
        this.editMode = true;
      }
    }
  }

  /**
   * Suscripción a la respuesta de readRecords$ que recargará la lista de socios.
   */
  readRecord() {
    this.readRecord$().subscribe(
      res => this.arrayUsers = res,
      err => this.showmessage('Ha habido un error: ' + err.error.text, 'danger')
    );
  }

  /**
   * Vacia los datos del objeto user.
   */
  private resetForm() {
    this.user.id = '';
    this.user.dni = '';
    this.user.nombre = '';
  }

  /**
   * Suscripción a la respuesta de saveRecord$. Si ha habido éxito, vacia el
   * objeto user y recarga la lista de socios.
   * @param user Objeto que contiene los datos del usuario a guardar.
   */
  private saveRecord(user) {
    this.saveRecord$(user).subscribe(
      res => {
        if (res > 0) {
          this.showmessage('Ha habido un error con código ' + res, 'danger');
        } else {
          this.showmessage('El registro se guardó correctamente', 'success');
          this.resetForm();
          this.readRecord();
        }
      },
      err => this.showmessage('Ha habido un error: ' + err.error.text, 'danger')
    );
  }

  /**
   * Muestra un mensaje al usuario
   * @param message Texto del mensaje a mostrar.
   * @param type Tipo del mensaje
   */
  private showmessage(message: string, type: msgstyle): void {
    this.message = message;
    this.messageType = type;
  }
}
