# Generated by Django 2.0.6 on 2018-08-10 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pins', '0003_auto_20180810_0835'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin',
            name='postcode',
            field=models.CharField(blank=True, max_length=6),
        ),
        migrations.AddField(
            model_name='pin',
            name='state',
            field=models.CharField(blank=True, max_length=31),
        ),
        migrations.AddField(
            model_name='pin',
            name='suburb',
            field=models.CharField(blank=True, max_length=63),
        ),
    ]
