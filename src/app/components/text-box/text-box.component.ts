import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true
    }
  ]
})
export class TextBoxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() column: string = '12';

  @Input() options: { label: string; value: any }[] = []; // สำหรับ select/dropdown

  @ViewChild('inputRef') inputRef!: ElementRef;

  value: any = '';
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let val: any = target.value;

    if (this.type === 'number') {
      val = Number(val);
    }

    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  openDatePicker() {
    if (this.inputRef?.nativeElement?.showPicker) {
      this.inputRef.nativeElement.showPicker();
    }
  }


  getWidth(): string {
    const col = Number(this.column);
    if (isNaN(col) || col < 1 || col > 12) {
      return '100%'; // fallback
    }
    const percent = (col / 12) * 100;
    return `${percent}%`;
  }

  onSelectChange(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
  
  
  
}
