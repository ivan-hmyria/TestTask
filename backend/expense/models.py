from django.db import models


class ExpenseType(models.Model):
    title = models.CharField(max_length=32)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Expense(models.Model):
    type = models.ForeignKey(ExpenseType, on_delete=models.CASCADE, related_name="expenses")
    sum = models.FloatField()
    notes = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.type} - {self.sum}"
