from django.contrib import admin
from expense.models import Expense, ExpenseType


# Register your models here.
@admin.register(ExpenseType)
class ExpenseTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(Expense)
class Expense(admin.ModelAdmin):
    fields = ['type', 'sum', 'notes', 'date']
