from django.shortcuts import render
from expense.models import ExpenseType, Expense
from rest_framework.viewsets import ModelViewSet
from expense.serializers import ExpenseSerializer, ExpenseTypeSerializer, AnalysisSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from expense.filters import ExpenseFilter
from datetime import date, datetime
from django.db.models import Prefetch


class ExpenseTypeModelViewSet(ModelViewSet):
    serializer_class = ExpenseTypeSerializer
    queryset = ExpenseType.objects.all()

    def destroy(self, request, *args, **kwargs):
        print(self.get_object().expenses)
        if self.get_object().expenses.all().count() != 0:
            return Response("There are Expenses for that Expense", status=HTTP_400_BAD_REQUEST)
        else:
            self.get_object().delete()
        return Response("Successfully deleted", status=HTTP_200_OK)


class ExpenseModelViewSet(ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all().order_by('-date')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ExpenseFilter

    @action(detail=False, methods=['get'])
    def get_groped_expenses(self, request, pk=None):
        if request.GET.get('after_date') and request.GET.get('before_date'):
            after_date = datetime.strptime(request.GET['after_date'], "%Y-%m-%d").date()
            before_date = datetime.strptime(request.GET['before_date'], "%Y-%m-%d").date()

            expense_types = ExpenseType.objects.prefetch_related(
                Prefetch('expenses', queryset=Expense.objects.filter(date__gte=after_date, date__lte=before_date)))

            serializer = AnalysisSerializer(expense_types, many=True)

        elif request.GET.get('after_date'):
            after_date = datetime.strptime(request.GET['after_date'], "%Y-%m-%d").date()
            expense_types = ExpenseType.objects.prefetch_related(
                Prefetch('expenses', queryset=Expense.objects.filter(date__gte=after_date)))

            serializer = AnalysisSerializer(expense_types, many=True)

        elif request.GET.get('before_date'):
            before_date = datetime.strptime(request.GET['before_date'], "%Y-%m-%d").date()
            expense_types = ExpenseType.objects.prefetch_related(
                Prefetch('expenses', queryset=Expense.objects.filter(date__lte=before_date)))

            serializer = AnalysisSerializer(expense_types, many=True)

        else:
            expense_types = ExpenseType.objects.prefetch_related(
                Prefetch('expenses', queryset=Expense.objects.filter(date__month=date.today().month,
                                                                     date__year=date.today().year)))

            serializer = AnalysisSerializer(expense_types, many=True)

        return Response({"data": serializer.data})
