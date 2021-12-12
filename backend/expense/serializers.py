from rest_framework.serializers import ModelSerializer
from expense.models import ExpenseType, Expense


class ExpenseTypeSerializer(ModelSerializer):
    class Meta:
        model = ExpenseType
        fields = "__all__"


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = "__all__"


class AnalysisSerializer(ModelSerializer):
    expenses = ExpenseSerializer(many=True)

    class Meta:
        model = ExpenseType
        fields = "__all__"
