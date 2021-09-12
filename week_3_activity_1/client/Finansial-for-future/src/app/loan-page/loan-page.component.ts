import { Component, OnInit } from '@angular/core';
import { getDaysInMonth, getFirstDay, getWeek } from '../../utils/utils';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-loan-page',
	templateUrl: './loan-page.component.html',
	styleUrls: ['./loan-page.component.scss']
})
export class LoanPageComponent implements OnInit {

	// public date = new Date(Date.now());
	public date = moment();
	public daysArr;

	public dateForm: FormGroup;

	public loanMsg: string;

	constructor(private fb: FormBuilder) {
		this.initDateForm()
	}

	ngOnInit(): void {
		this.daysArr = this.createCalendar(this.date);
	}

	initDateForm() {
		return (this.dateForm = this.fb.group({
			dateFrom: [null, Validators.required],
			dateTo: [null, Validators.required]
		}));
	}

	createCalendar(month) {
		let firstDay = moment(month).startOf('M');
		let days = Array.apply(null, { length: month.daysInMonth() })
			.map(Number.call, Number)
			.map(n => {
				return moment(firstDay).add(n, 'd');
			});

		for (let n = 0; n < firstDay.weekday(); n++) {
			days.unshift(null);
		}
		return days;
	}

	todayCheck(day) {
		if (!day) { return false }
		return moment().format('L') === day.format('L');
	}

	nextMonth() {
		this.date.add(1, 'M');
		this.daysArr = this.createCalendar(this.date);
	}

	prevMonth() {
		this.date.subtract(1, 'M');
		this.daysArr = this.createCalendar(this.date);
	}

	resetForm() { 
		this.dateForm.setValue({ dateFrom: null, dateTo: null });
	}

	 selectedDate(day) {
		const dayFormatted = day.format('MM/DD/YYYY');
		const isFormValid = this.dateForm.valid;
		const isDateFromSelected = this.dateForm.get('dateFrom').value;

		if (isFormValid) {
			this.resetForm();
			return;
		}

		if (!isDateFromSelected) {
			this.dateForm.get('dateFrom').patchValue(dayFormatted);
			return;
		}

		this.dateForm.get('dateTo').patchValue(dayFormatted);
	}

	isSelected(day) {
		if (!day) {
		  return false;
		}
		let dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
		let dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
		if (this.dateForm.valid) {
		  return (
			dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
		  );
		}
		if (this.dateForm.get('dateFrom').valid) {
		  return dateFromMoment.isSame(day);
		}
	}

	handleSubmit() {
		if (!this.dateForm.valid) {
		  return;
		}
		let dateFromMoment = this.dateForm.value.dateFrom;
		let dateToMoment = this.dateForm.value.dateTo;
		this.loanMsg = `Loan taken from ${dateFromMoment} to ${dateToMoment}`;
	  }
}
