from django_filters import rest_framework as filters
from expense.models import Expense


class ExpenseFilter(filters.FilterSet):
    date = filters.DateFromToRangeFilter(field_name="date")

    class Meta:
        model = Expense
        fields = ['date']
