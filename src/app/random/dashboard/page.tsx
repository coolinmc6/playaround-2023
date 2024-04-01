"use client"

import React from 'react';
import { Grid, Card, List, ListItem, Text, Title } from '@tremor/react'
import skillsJson from '@/app/random/dashboard/domain-skills.json'

const skillsArray = skillsJson.domainsSkills
const Dashboard = () => {
  
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="text-3xl mb-2">Skills Dashboard</Title>
      {skillsArray.map((domain, index) => {
        return (
          <div key={domain.domain} className="pb-4 pt-4">
            <Title className="text-2xl mb-2">{domain.domain}</Title>
            <Text className="pb-2 pt-2 mb-4">{domain.domainDescription}</Text>
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
              <Card>
                <Title>Level 1 Skills</Title>
                <List>
                  {domain.level1Skills.map((skill) => {
                    return (
                      <ListItem key={skill.id}>{skill.text}</ListItem>
                    )
                  })}
                </List>
              </Card>
              <Card>
                <Title>Level 3 Skills</Title>
                <List>
                  {domain.level3Skills.map((skill) => {
                    return (
                      <ListItem key={skill.id}>{skill.text}</ListItem>
                    )
                  })}
                </List>
              </Card>
              <Card>
                <Title>Level 5 Skills</Title>
                <List>
                  {domain.level5Skills.map((skill) => {
                    return (
                      <ListItem key={skill.id}>{skill.text}</ListItem>
                    )
                  })}
                </List>
              </Card>
            </Grid>
          </div>
        )
      })}
    </div>
  )
}

export default Dashboard;
